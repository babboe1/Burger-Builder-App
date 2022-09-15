import axios from 'axios'


const instances = axios.create({
	baseURL: 'https://burger-builder-55a19-default-rtdb.firebaseio.com/',
});

export default instances;