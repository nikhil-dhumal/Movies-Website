import { Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import { useSelector } from "react-redux";

const GenresSelect = ({ mediaType, selectedGenre, setSelectedGenre }) => {
  const { genres } = useSelector((state) => state.genres);

  const handleChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <FormControl sx={{ width: "15%" }}>
      <InputLabel id="select-genres-label">Select Genre</InputLabel>
      <Select
        labelId="select-genres-label"
        id="select-genres"
        value={selectedGenre}
        onChange={handleChange}
        input={<OutlinedInput id="select-single-chip" label="Select Genre" />}
        renderValue={(selected) => (
          <Chip key={selected} label={genres[mediaType][selected].name} />
        )}
      >
        {genres[mediaType]?.map((genre, index) => (
          <MenuItem key={index} value={index}>
            {genre.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GenresSelect;
