import { BlogPostContainer, Title, Heading, Body} from 'components/Styles'

const calendar = [
	{
		month: <Heading>January</Heading>,
		content: <Body>
			-
		</Body>
	},
	{
		month: <Heading>February</Heading>,
		content: <Body>
			Black-legged kittiwake incursion.
		</Body>
	},
	{
		month: <Heading>March</Heading>,
		content: <Body>
			-
		</Body>
	},
	{
		month: <Heading>April</Heading>,
		content: <Body>
			-
		</Body>
	},
	{
		month: <Heading>May</Heading>,
		content: <Body>
			Spring storms can bring in petrels - think Cook's, Murphy's, and Hawaiian. Red-necked phalaropes
			are on the move and can sometimes be seen in large numbers.
		</Body>
	},
	{
		month: <Heading>June</Heading>,
		content: <Body>
			Tends to be largely quiet as we move into summer. Mornings are foggy, but generally clear by mid-day.
			Some spring storms still pass through. Local breeders (gulls, cormorants, guillemots) abound.
			Wintering sooty shearwaters congregate in the thousands and move about the bay.
			Watch for puffins, petrels, and subadult jaegers.			
		</Body>
	},
	{
		month: <Heading>July</Heading>,
		content: <Body>
			-
		</Body>
	},
	{
		month: <Heading>August</Heading>,
		content: <Body>
			-
		</Body>
	},
	{
		month: <Heading>September</Heading>,
		content: <Body>
		    Arctic terns. Buller's shearwater.
		</Body>
	},
	{
		month: <Heading>October</Heading>,
		content: <Body>
			-
		</Body>
	},
	{
		month: <Heading>November</Heading>,
		content: <Body>
			Scoters, loons.
		</Body>
	},
	{
		month: <Heading>December</Heading>,
		content: <Body>
			-
		</Body>
	},
]

const d = new Date();
let month = d.getMonth();
const monthsAfterCurrent = calendar.slice(month);
const monthsBeforeCurrent = calendar.slice(0, month);

function Calendar() {

  return (
    <BlogPostContainer>
    <Title> Calendar </Title>
	    <div>
	      {[...monthsAfterCurrent, ...monthsBeforeCurrent].map((item, index) => (
	        <div key={index}>
	          {item.month}
	          {item.content}
	        </div>
	      ))}
	    </div>
    </BlogPostContainer>
  );
}

export default Calendar;