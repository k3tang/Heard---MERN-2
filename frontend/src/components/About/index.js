import React from "react"
import { Link } from 'react-router-dom'
import "./About.css";



const AboutPage = () => {



    return(
        <>
        
        <div className="about-page-container fadeInBottom">
            <div className="about-page-title-container">
                <h1 className="about-page-title">Meet the Team</h1>
            </div>

            <div className="about-page-left">
                <h2 className="about-page-left-names"> Karen Siu </h2>
                <img className="about-page-left-photo" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
                <div className="about-page-links" >
                    <a href="https://github.com/k3tang" target="_blank"><i class="fab fa-github-square"></i></a>
                    <a href="https://www.linkedin.com/in/karentsiu/" target="_blank"><i class="fab fa-linkedin"></i></a>
                </div>
                <div className="about-bio-container">
                    <h3 className="about-page-jobs">Project Lead </h3>
                    <p className="about-page-left-bios">
                    I am a full stack software engineer with a passion for utilizing React, Redux, and Rails to create a seamless user experience with an intuitive and aesthetic user interface. With a technical background in healthcare as a nurse practitioner, I bring with me strong communication skills, methodological approach to problem solving, and a collaborative mindset.                     
                    </p>
                </div>
            </div>
            <div className="about-page-right">
                <h2 className="about-page-right-names"> Anna Luz Fisher </h2>
                <img className="about-page-right-photo" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
                <div className="about-page-links" >
                    <a href="https://github.com/annaluzfisher" target="_blank"><i class="fab fa-github-square"></i></a>
                    <a href="https://www.linkedin.com/in/anna-luz-fisher-599862245/" target="_blank"><i class="fab fa-linkedin"></i></a>
                </div>
                <div className="about-bio-container">
                    <h3 className="about-page-jobs">Backend Lead</h3>
                    <p className="about-page-right-bios">
                        I'm a quick learner and a fun person. I love extreme sports and the puzzle solving that comes with both adventure and software engineering. My goal in life is to be a good person above all else. What is life if you can't say you were kind and true to yourself?                     
                    </p>
                </div>
            </div>
            
            <div className="about-page-left">
                <h2 className="about-page-left-names"> Vincent Shuali </h2>
                <img className="about-page-left-photo" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
                <div className="about-page-links" >
                    <a href="https://github.com/canjalal" target="_blank"><i class="fab fa-github-square"></i></a>
                    <a href="https://www.linkedin.com/in/vincentshuali/" target="_blank"><i class="fab fa-linkedin"></i></a>
                </div>
                <div className="about-bio-container">
                    <h3 className="about-page-jobs">Backend Developer</h3>
                    <p className="about-page-left-bios">
                    I'm a software engineer focused on web development technologies such as JavaScript, React, Redux, MongoDB, and PostgreSQL. My primary area of interest is building connections, whether it's between electrical signals and beautiful graphs, or between humans of different backgrounds.                    
                    </p>
                </div>
            </div>
            <div className="about-page-right">
                <h2 className="about-page-right-names"> Dan Kam </h2>
                <img className="about-page-right-photo" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
                <div className="about-page-links" >
                    <a href="https://github.com/annaluzfisher" target="_blank"><i class="fab fa-github-square"></i></a>
                    <a href="https://www.linkedin.com/in/danronkam/" target="_blank"><i class="fab fa-linkedin"></i></a>
                </div>
                <div className="about-bio-container">
                    <h3 className="about-page-jobs">Frontend Developer</h3>
                    <p className="about-page-right-bios">
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."                    
                    </p>
                </div>
            </div>





        </div>
        </>
    )
}

export default AboutPage;