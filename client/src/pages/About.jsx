import Github from '../assets/github.png';
function About() {
  return (
    <div>
      <h1>About</h1>
    <h3>Breadcrumbs: Find Your Friends, Anytime, Anywhere</h3>

    <h4>Discover the Essence of Breadcrumbs</h4>
    <p>Breadcrumbs is an brand new, innovative, location-sharing app designed to keep you connected with your friends and loved ones in real-time. Breadcrumbs transforms the concept of leaving a trail to be followed into a modern, digital experience. Our app allows users to share their current location on a dynamic map, creating a virtual trail of 'breadcrumbs' that friends can follow.</p>

    <h4>Key Features</h4>
    <ul>
        <li><strong>Real-Time Location Sharing:</strong> Share your location in real-time with selected friends, giving them the ability to trace your steps.</li>
        <li><strong>Interactive Map Interface:</strong> A user-friendly map that shows the 'breadcrumb trail' of your friends, soon to be complete with timestamps and geo-locations.</li>
        <li><strong>Lost and Found:</strong> Ideal for locating friends in crowded places, unfamiliar cities, or just for peace of mind during solo journeys.</li>
        <li><strong>Group Journeys:</strong> Create groups for specific events or trips, allowing all members to see each other's locations in real-time.</li>
    </ul>

    <h4>Why Choose Breadcrumbs?</h4>
    <ul>
        <li><strong>Stay Connected:</strong> Whether you're attending a festival, exploring a new city, or hiking in remote areas, Breadcrumbs keeps you connected.</li>
        <li><strong>Safety and Security:</strong> Offers a secure way to ensure friends and family can find you if you're lost or in need of assistance.</li>
        <li><strong>Simplicity and Ease of Use:</strong> Designed with all ages and tech levels in mind, Breadcrumbs is intuitive and straightforward.</li>
    </ul>

    <h4>Our Vision</h4>
    <p>At Breadcrumbs, we believe in a world where staying connected with those you care about is seamless and secure. Our vision is to create a platform that not only connects people but also provides a sense of safety and community, no matter where life takes you.</p>

    <h4>Join the Trail</h4>
    <p>Ready to leave a trail for your friends to follow? Log into Breadcrumbs now and embark on a journey of connection and discovery!</p>
        <ul className='center'>Contributors
        <li style={{ listStyleType: "none" }}><a href="https://github.com/Cehura-Code" target = "_blank">Brittney Cehura</a></li>
        <li style={{ listStyleType: "none" }}><a href="https://github.com/ccoff1798" target = "_blank">Cody Coffey</a></li>
        <li style={{ listStyleType: "none" }}><a href="https://github.com/RedactdName" target = "_blank">Lisa Eimicke</a></li>
        </ul >
        <a href="https://github.com/RedactdName/friendTracker"  onclick="document.location=this.id+'.html'" target = "_blank" >
    <img src={Github} alt="Github logo" className='center img-fluid scale50'/>
</a>
    </div>
  );
}
export default About;