import MainContent from "../components/MainContent";
// import PageSection from '../components/PageSection';

function PageNotFound() {
    return (
        <MainContent>
            {/* <PageSection> */}
            <h1>Page Not Found (404 Error)</h1>
            <p>Sorry it seems this link is broken or simply does not exist.</p>
            {/* </PageSection> */}
        </MainContent>
    );
}

export default PageNotFound;
