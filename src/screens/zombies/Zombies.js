import { Avatar, Box, Button, Container, FormControl, FormControlLabel, Grid, makeStyles, Radio, RadioGroup, Table, TableBody, TableCell, TableRow, Typography, withStyles } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { CASE_ONE, CASE_MINE, CASE_TWO, CASE_THREE } from '../../constants/matrices'
import { getNumberOfDays, initialMatrix, reset } from '../../redux/actions'
import Empty from '../../Resources/EmptyHome.svg'
import Healthy from '../../Resources/HealthyHome.svg'
import Infected from '../../Resources/InfectedHome.svg'
import Zombie from '../../Resources/ZombieHome.svg'
import StateCarousel from './StateCarousel'
import ZombieChart from './ZombieChart'


const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />)

const useStyles = makeStyles((theme) => ({
    tableCell:{
        padding: theme.spacing(1),
        border: 0,
        alignContent: 'right'
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    margin: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    box: {
        margin: theme.spacing(2)
    },
    house: {
        marginLeft: theme.spacing(1)
    }
}))
const Zombies = ({ getNumberOfDays, zombieReducer, initialMatrix, reset }) => {
    const classes = useStyles()
    const { gridState, gridSteps, numofDays, initialGrid } = zombieReducer
    const [value, setValue] = useState('1');
    const handleChange = (event) => {
        reset()
        setCopyGridState(null)
        setValue(event.target.value);
        setCopyNumofDays(null)
    }
    const [disable, setDisable] = useState(false)
    const [copyGridState, setCopyGridState] = useState(null)
    const [copyNumofDays, setCopyNumofDays] = useState(null)
    useEffect(() => {
        if(numofDays){
            setTimeout(() => { 
                setDisable(false)
                setCopyNumofDays(numofDays)
                setCopyGridState(gridState)
                reset()
            }, 1000)
        } else {
            initialMatrix(value === '1' ? CASE_ONE : (value === '2' ? CASE_TWO : CASE_THREE))
        }
    }, [value, numofDays])

    const checkIndex = (rowIndex, cellIndex) => {
        return gridSteps && gridSteps.arr.some(a => a.x === rowIndex && a.y === cellIndex)
    }

    const onClick = (event) => {
        setDisable(true)
        getNumberOfDays(value === '1' ? CASE_ONE : (value === '2' ? CASE_TWO : CASE_THREE))
    }
    return (
        <div>
            <Container>
                <FormControl component="fieldset">
                    <RadioGroup row aria-label="case" name="case" value={value} onChange={handleChange}>
                        <FormControlLabel value='1' disabled={disable} control={<GreenRadio />} label="Case 1" />
                        <FormControlLabel value='2' disabled={disable} control={<GreenRadio />} label="Case 2" />
                        <FormControlLabel value='3' disabled={disable} control={<GreenRadio />} label="Case 3" />
                    </RadioGroup>
                </FormControl>
                <Box className={classes.margin} component='div'><Button disabled={disable} variant='contained' color='primary' size='small' onClick={onClick}> Start </Button></Box>
                {gridSteps && <Typography component='h5' variant='h5' className={classes.margin}>Day {gridSteps.day}</Typography>}
                {/* <Box display='flex' justifyContent='center'> */}
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Box className={classes.box} alignItems='center' display='flex'> 
                                <Avatar 
                                    className={classes.small}
                                    variant="rounded" 
                                    src={Empty}
                                />
                                <Typography className={classes.house}>Empty House</Typography>
                            </Box>
                            <Box className={classes.box} alignItems='center' display='flex'> 
                                <Avatar 
                                    className={classes.small}
                                    variant="rounded" 
                                    src={Healthy}
                                />
                                <Typography className={classes.house}>Healthy House</Typography>
                            </Box>
                            <Box className={classes.box} alignItems='center' display='flex'> 
                                <Avatar 
                                    className={classes.small}
                                    variant="rounded" 
                                    src={Zombie}
                                />
                                <Typography className={classes.house}>Zombie House</Typography>
                            </Box>
                            <Box className={classes.box} alignItems='center' display='flex'> 
                                <Avatar 
                                    className={classes.small}
                                    variant="rounded" 
                                    src={Infected}
                                />
                                <Typography className={classes.house}>Infected House</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            {initialGrid.length !== 0  ? 
                            <Table size='small'>
                                <TableBody>
                                    {initialGrid
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
                            :
                            <Table>
                                <TableBody>
                                    {gridSteps && gridSteps.modifiedGrid
                                    .map((row, rowIndex) => (
                                        <TableRow>
                                            {row.map((cell, cellIndex) => (
                                                <TableCell className={classes.tableCell} align='center'>
                                                    <Avatar 
                                                        variant="rounded" 
                                                        src={cell === 0 ? Empty : cell === 1 ? Healthy : checkIndex(rowIndex, cellIndex) ? Infected : Zombie} 
                                                    />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            }
                        </Grid>
                        {copyNumofDays && <Grid item xs={3}>
                            {copyNumofDays === -1 ? <Typography component='h6' variant='h6'> Community will not be totally infected </Typography> : 
                            <Typography variant='h6' component='h6'> Community will be totally infected in {copyNumofDays} day(s)</Typography>}
                        </Grid>}
                    </Grid>
                {/* </Box> */}
            </Container>
            { copyGridState && <StateCarousel gridfinal={copyGridState}/>}
            { copyGridState && <ZombieChart gridfinal={copyGridState}/>}
        </div>
    )
}




const mapStateToProps = state => ({
    zombieReducer: state.zombieReducer
})

export default connect(mapStateToProps, { getNumberOfDays ,initialMatrix, reset })(Zombies)
