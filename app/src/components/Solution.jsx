import React from 'react';
import { ArcherContainer, ArcherElement } from 'react-archer';
import { Grid, Typography } from '@material-ui/core';

const styles = {
    gridItem: {
        marginTop: '50px'
    }
    
}

class Soultion extends React.Component {

    renderItem = (letter, id, targetId) => {
        
        if (targetId) {
            const row = Math.floor(id / 4);
            const targetRow = Math.floor(targetId / 4);


            let sourceAnchor;
            let targetAnchor;
            if (row < targetRow) {
                sourceAnchor = 'bottom';
                targetAnchor = 'top';
            } else if (row > targetRow) {
                sourceAnchor = 'top';
                targetAnchor = 'bottom';
            } else {
                const col = id % 4;
                const targetCol = targetId % 4;
                
                if (col < targetCol) {
                    sourceAnchor = 'bottom';
                    targetAnchor = 'left';
                } else {
                    sourceAnchor = 'bottom';
                    targetAnchor = 'right';
                }

            }
            
            return (
                <Grid item xs={3} style={styles.gridItem} key={id}>
                    <ArcherElement 
                        id={`letter${id}`}
                        relations={[{
                            targetId: `letter${targetId}`,
                            targetAnchor: targetAnchor,
                            sourceAnchor: sourceAnchor,
                            style: { strokeColor: 'blue', strokeWidth: 1 },
                        }]}
                    >
                        <Typography align="center" variant="h2">
                            {letter}
                        </Typography>
                    </ArcherElement>
                    
                </Grid>)
        } else {
            return (
                <Grid item xs={3} style={styles.gridItem} key={id}>
                    <Typography align="center" variant="h2">
                        {letter}
                    </Typography>                    
                </Grid>)
        }
        

        
    }

    buildGrid = () => {
        const {coords, word, letters} = this.props;
        
        // const letterGrid = [];
        // for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
        //     const row = [];
        //     for (let colIndex = 0; colIndex < 4; colIndex++) {
        //         row.push(letters[rowIndex * 4 + colIndex])
        //     }
        //     letterGrid.push(row);
        // }
        let row = 0;
        let col = 0;
        let count = 0;
        return letters.split('').map((letter) => {
            let targetId = false;
            for (let coordIndex = 0; coordIndex < coords.length - 1; coordIndex++) {
                const coord = coords[coordIndex];
                if (coord[0] == row && coord[1] == col) {
                    const nextCoord = coords[coordIndex + 1];
                    targetId = nextCoord[0] * 4 + nextCoord[1];
                    
                }
            }

            const renderedItem = this.renderItem(letter, count, targetId);
             
            col += 1;
            if (col == 4) {
                row += 1;
                col = 0;
            }

            count += 1;
            return renderedItem;
        });

    }

    render() {
        const {coords, word, letters} = this.props;
        this.buildGrid();
        return (
            <React.Fragment>
            <Typography variant="h1">{word}</Typography>
            <div style={{maxWidth: '500px'}}>
                <ArcherContainer>
                    <Grid container>
                        {this.buildGrid()}
                    </Grid>
                    
                </ArcherContainer>
                
            </div>
            </React.Fragment>
            
            
        )

    }
}

export default Soultion;