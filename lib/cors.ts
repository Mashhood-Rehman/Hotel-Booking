import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'], 
  origin: '*', 
});

export default cors;
