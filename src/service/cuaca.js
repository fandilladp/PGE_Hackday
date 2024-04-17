import axios from "axios"

const getData = async (date) => {
    try {
        const response = await axios.get('https://office.pge.world/pgehack/?tgl=' + date);

        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const exportedModules = { getData }

export default exportedModules;