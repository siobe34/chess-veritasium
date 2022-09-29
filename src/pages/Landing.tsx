import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faFaceSmileBeam } from "@fortawesome/free-solid-svg-icons";

import Content from "../components/Content";
import Button from "../components/Button";

function Landing() {
    return (
        <Content>
            <h1 className='font-bold text-2xl text-center mt-6'>What is this site?</h1>
            <div className='flex flex-col items-start justify-center w-7/12'>
                <p className='leading-relaxed'>
                    <span className='font-semibold text-lg underline leading-loose'>
                        This site is a tool to train your recognition of chess positions.
                    </span>
                    <br />
                    The "Practice" page of the site displays a chess position that may arise in a human game with the position remaining on screen for
                    5 seconds. After the position is cleared from the screen, you have to try to correctly place as many pieces on the board that you
                    can remember from the given position. If you get it right, move onto the next position. If not, you can continue taking as many 5
                    second peeks as required in order to remember the full position.
                </p>
            </div>
            <h1 className='font-bold text-2xl text-center mt-6'>Why use this method to train?</h1>
            <div className='flex flex-col items-start justify-center w-7/12'>
                <p className='leading-relaxed'>
                    This method trains your ability to <span className='font-semibold underline'>recognize</span> chess positions that could possibly
                    occur in human games. Recognition is one of the core requirements of what makes someone a master of a particular skill. This is
                    more deeply explained in Veritasium's video essay on{" "}
                    <a className='text-blue-500 underline hover:text-blue-300' href='https://www.youtube.com/watch?v=5eW6Eagr9XA'>
                        mastering skills
                    </a>
                    , and how it takes more than just 10,000 (10k) hours.
                    <br />
                    In the video, Derek brings up a study that found a major difference between players of differing skill levels is how many chess
                    pieces they can recall in a 5 second time frame given a position from a human game. Turns out, the GM's were able to recall almost
                    the entire position with a 5 second glance. So why not try mastering your chess recognition skills today{" "}
                    <FontAwesomeIcon icon={faFaceSmileBeam} />
                </p>
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

export default Landing;
