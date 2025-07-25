import { BlogPostContainer, Title, Body} from 'components/Styles'
import { iNaturalistGallery, INaturalistWidget, INaturalistUserObservations } from 'components/iNaturalist';

function About() {
  return (
    <BlogPostContainer>
    <Title> Kyan Russell </Title>
	    <Body>
		    I'm a Monterey native passionate about birds, native plants, art, and photography. I work primarily in pencil and watercolors.
		    I especially love to learn and share about range-restricted species and tricky identifications.
		I share artworks on Instagram @
		    <a href="https://www.instagram.com/kyanocitta">kyanocitta</a>.
	    </Body>
	    <Body>
		    I serve on the board of Monterey Audubon Society, for which I also lead birding field trips.
		</Body>
	    <Body>
	    	Questions or feedback can be directed to <a href="mailto:kyansrussell@gmail.com">kyansrussell@gmail.com</a>.
	    </Body>
	    <INaturalistUserObservations user_name={'kyanocitta'}/>
    </BlogPostContainer>
  );
}

export default About;