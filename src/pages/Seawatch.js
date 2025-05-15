import BlogPost from 'components/BlogPost';

function Seawatch() {
  return (
    <BlogPost post={[
          {
            type: 'title',
            content: 'View from Point Pinos',
          },
          {
            type: 'image',
            src: '/kyanocitta/images/pinos_map_small.png',
          },
          {
            type: 'title',
            content: 'Flightstyle of three common shearwater species',
          },
          {
            type: 'image',
            src: '/kyanocitta/images/shearwater_flight.png',
          }
    ]}
    />
  );
}

export default Seawatch;

