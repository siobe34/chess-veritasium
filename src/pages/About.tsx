import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faHeart } from "@fortawesome/free-solid-svg-icons";

import Content from "../components/Content";
import Button from "../components/Button";
import Table, { TableBody, TableRow, TableCell } from "../components/Table";

function About() {
    return (
        <Content>
            <h1 className='font-bold text-2xl text-center mt-6'>What development tools were used?</h1>
            <div className='flex flex-col items-center justify-center w-7/12'>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                Deployed for free with Vercel <FontAwesomeIcon className='text-red-400' icon={faHeart} />
                            </TableCell>
                        </TableRow>
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
                            <TableCell>react-chessboard (npm package)</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <Button buttonStyle='primary' customUtils='py-4 m-4'>
                <Link to={"/practice"}>
                    Try to Master Chess!
                    <FontAwesomeIcon icon={faArrowRight} className='ml-2' />
                </Link>
            </Button>
        </Content>
    );
}

export default About;
