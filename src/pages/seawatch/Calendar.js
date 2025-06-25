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
			Hawaiian petrels.
		</Body>
	},
	{
		month: <Heading>June</Heading>,
		content: <Body>
			Puffins, petrels, sooty shearwaters, subadult jaegers.			
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