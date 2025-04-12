import { useEffect, useState } from "react";
import axios from "axios";
import CONSTANTS from "../utils/constants";

const useFetchTrailer = (id) => {
  const [result, setResult] = useState(null);

  const fetchTailer = async () => {
    try {
      const response = await axios.get(
        `${CONSTANTS.TMDB_MOVIE_BASE_URL}/${id}/videos?language=en-US`,
        CONSTANTS.API_OPTIONS
      );
      const trailer = response.data.results?.filter(
        (video) => video.type === "Trailer"
      );

      if (trailer) {
        const video = !trailer.length
          ? response?.data?.results[0].key
          : trailer[0].key;
        setResult(video);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchTailer();
  }, [id]);

  return result;
};

export default useFetchTrailer;
