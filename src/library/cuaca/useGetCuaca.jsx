import axios from "axios";
import moment from "moment";
import { useQuery } from "react-query";

const getDataCuaca = async (body) => {
  const result = await axios.get(`/pgehack?tgl=${body.tgl}`);
  return result;
};

const useGetCuaca = (body) => {
  const query = useQuery({
    queryFn: () => {
      return getDataCuaca(body);
    },
    queryKey: ["cuaca", body],
    select: (data) => {
      if (!data?.data) {
        return null;
      }
      const filteredData = data?.data?.filter(
        (item) => item.location_name === body.location_name
      );
      return filteredData[0];
    },
  });

  return query;
};

export default useGetCuaca;
