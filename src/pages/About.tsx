import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faHeart } from "@fortawesome/free-solid-svg-icons";

import Content from "../components/Content";
import LinkButton from "../components/LinkButton";
import Table, { TableBody, TableRow, TableCell } from "../components/Table";

function About() {
    return (
        <Content>
            <h1 className='font-bold text-2xl text-center mt-6'>This project was built with:</h1>
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
                            <TableCell>react-chessboard (npm package)</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Deployed for free with Vercel <FontAwesomeIcon className='text-red-400' icon={faHeart} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <LinkButton href='/practice' buttonStyle='primary'>
                Try to Master Chess!
                <FontAwesomeIcon icon={faArrowRight} className='ml-2' />
            </LinkButton>
        </Content>
    );
}

export default About;
