import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faFaceSmileBeam } from "@fortawesome/free-solid-svg-icons";

import Content from "../components/Content";
import LinkButton from "../components/LinkButton";

function Landing() {
    return (
        <Content>
            <h1 className='font-bold text-2xl text-center mt-6'>What is this site?</h1>
            <div className='flex flex-col items-start justify-center w-7/12'>
                <p className='leading-relaxed'>
                    <span className='font-semibold text-lg underline leading-loose'>
                        This site is a tool to train your recognition of chess positions.
                    </span>{" "}
                    The "Practice" page of the site displays a chess position that may arise in a human game with the position remaining on screen for
                    5 seconds. After the position is cleared from the screen, you have to try to correctly place as many pieces on the board that you
                    can remember from the given position. If you get it right, move onto the next position. If not, you can continue taking as many 5
                    second peeks as required in order to remember the full position.
                </p>
            </div>
            <h1 className='font-bold text-2xl text-center mt-6'>Why use this method?</h1>
            <div className='flex flex-col items-start justify-center w-7/12'>
                <p className='leading-relaxed'>
                    Veritasium has{" "}
                    <a className='text-blue-500 underline hover:text-blue-300' href='https://www.youtube.com/watch?v=5eW6Eagr9XA'>
                        a video
                    </a>{" "}
                    explaining the ways in which we master particular skills that presents why this method is effective.
                    <br />
                    The takeaway is that it's not just 10,000 (10k) hours of practice that results in mastery of a skill but a lot more to it. In the
                    case of chess, the ability to recognize positions that could possibly occur in human games is a contributing factor.
                </p>
            </div>
            <LinkButton href='/practice' buttonStyle='primary'>
                Try to Master Chess!
                <FontAwesomeIcon icon={faArrowRight} className='ml-2' />
            </LinkButton>
        </Content>
    );
}

export default Landing;
