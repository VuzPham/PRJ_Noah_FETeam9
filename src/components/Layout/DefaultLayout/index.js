import Header from "./Header";

function DefaulLayout({children, selectedSchool, onSelectSchool}) {
    return ( 
        <div>
             <Header selectedSchool={selectedSchool} currentPage="subject" />
            <div className="container">
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
     );
}

export default DefaulLayout;