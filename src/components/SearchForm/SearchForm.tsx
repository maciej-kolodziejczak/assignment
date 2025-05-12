import debounce from "debounce";

import type { FC } from "react";
import { useForm } from "react-hook-form";

import { SearchOutlined } from "@mui/icons-material";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";

type Props = {
  onSubmit: (v: { q: string }) => void;
};

type Inputs = {
  search: string;
};

export const SearchForm: FC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<Inputs>();

  return (
    <FormControl fullWidth variant="outlined">
      <OutlinedInput
        {...register("search", {
          onChange: debounce(
            handleSubmit(({ search }) => onSubmit({ q: search })),
            2000,
          ),
        })}
        type="text"
        placeholder="Search a GitHub username..."
        startAdornment={
          <InputAdornment position="start">
            <SearchOutlined />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
