import axios from "axios";
import { useQuery } from "react-query";

const getDataCuaca = (body) => {
  return axios.get(`/pgehack?tgl=${body.tgl}`);
};

const useGetCuaca = (body) => {
  const query = useQuery({
    queryFn: () => {
      return getDataCuaca(body);
    },
    queryKey: ["cuaca", body],
    select: (data) => {
      const filteredData = data?.data?.filter(
        (item) => item.location_name === body.location_name
      );
      return filteredData[0];
    },
  });

  return query;
};

export default useGetCuaca;
