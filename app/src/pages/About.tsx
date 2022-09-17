import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import MainContent from '../components/MainContent';
import Button from '../components/Button';
import Table, {TableBody, TableRow, TableCell } from '../components/Table';

function About() {

    return (
        <MainContent>
            <h1 className='font-bold text-3xl mt-6'>About</h1>
            <h1 className='font-bold text-2xl text-center mt-6'>Why'd you make this site?</h1>
            <div className='flex flex-col items-center justify-center w-7/12'>
                <p className='leading-loose'>
                    Mainly for education purposes, I'd never worked with Tailwind before and wanted to try it out.
                    And I was also inspired by Veritasium's video on <a className='text-blue-500 underline hover:text-blue-300' href='https://www.youtube.com/watch?v=5eW6Eagr9XA'>mastering skills</a> to become decent at chess.
                    I'd always wondered what set apart GM's from other chess players. Time, experience, and practice set aside - there had to be other factors at play.
                    Recognition of chess positions is surely one of those factors, though I'm certain there's plenty more.
                    Personally, part of my shortcomings as a player is my lack of ability to recognize positions in the way other players do.
                    So I made this site to practice that one specific aspect of chess.
                </p>
            </div>
            <h1 className='font-bold text-2xl text-center mt-6'>What development tools were used?</h1>
            <div className='flex flex-col items-center justify-center w-7/12'>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>React</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tailwind</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Font Awesome</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Lichess API</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Chess.js</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>react-chessboard (npm)</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <Button buttonStyle='primary' customUtils='py-4 m-4'>
                <Link to={'/practice'}>
                    Try to Master Chess!
                    <FontAwesomeIcon icon={faArrowRight} className='ml-2' />
                </Link>
            </Button>
        </MainContent>
    );
}

export default About;