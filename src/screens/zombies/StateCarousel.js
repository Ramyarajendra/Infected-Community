import { Avatar, Card, CardContent, CardHeader, Container, Grid, makeStyles, Table, TableBody, TableCell, TableRow, Typography } from '@material-ui/core';
import React from 'react'
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css"
import { connect } from 'react-redux';
import Empty from '../../Resources/EmptyHome.svg'
import Healthy from '../../Resources/HealthyHome.svg'
import Zombie from '../../Resources/ZombieHome.svg'

const useStyles = makeStyles((theme) => ({
    root:{
        margin: theme.spacing(3)
    },
    card: {
        marginRight: theme.spacing(2),
        width: 500,
        borderRadius: 10
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    tableCell:{
        padding: theme.spacing(1),
        border: 0,
        alignContent: 'right'
    },
    carousel:{
        // backgroundColor:'#6f8580',
        borderRadius: 7,
        padding: theme.spacing(5)
    }
}))

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
      slidesToSlide: 2
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 2
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

const StateCarousel = ({ gridfinal, initialGrid, useLightMode }) => {

    const classes = useStyles()

    return (
        <div className={classes.root}>

            { initialGrid.length !== 0 && 
            <Container>
                <Typography component='h5' variant='h5'> Stages of Spread</Typography>
                <Carousel
                className={classes.carousel}
                swipeable={true}
                // showDots={true}
                infinite={false}
                responsive={responsive}
                renderDotsOutside={true}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                >
                    {gridfinal && gridfinal.map(matrix => (
                        
                            
                            <Card variant='outlined' className={classes.card} style={useLightMode ? {backgroundColor: "#E0E6F1"} : {backgroundImage: 'linear-gradient(#3b4257,#33394c)'}}>
                            <CardHeader 
                                title={<Typography component='h6' style={{color: useLightMode ? 'black' : 'white'}} variant='h6'>{'Day '+ matrix.day}</Typography>}
                            />
                            <CardContent>
                            <Table size='small'>
                                <TableBody>
                                    {matrix.modifiedGrid
                                    .map((row, rowIndex) => (
                                        <TableRow>
                                            {row.map((cell, cellIndex) => (
                                                <TableCell className={classes.tableCell} align='right'>
                                                    <Avatar
                                                        className={classes.small} 
                                                        variant="rounded" 
                                                        src={cell === 0 ? Empty : cell === 1 ? Healthy : Zombie} 
                                                    />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            </CardContent>
                              </Card>
                      
                    ))}
                </Carousel>
            </Container> }
        </div>
    )
}

const mapStateToProps = state => ({
    initialGrid :state.zombieReducer.initialGrid,
    useLightMode: state.uiReducer.useLightMode
})

export default connect(mapStateToProps, null)(StateCarousel)
