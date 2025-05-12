import debounce from "debounce";

import type { FC } from "react";
import { useForm } from "react-hook-form";

import { SearchOutlined } from "@mui/icons-material";
import {
  CircularProgress,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";

type Props = {
  onSubmit: (v: { q: string }) => void;
  error?: string;
  isLoading?: boolean;
};

type Inputs = {
  search: string;
};

export const SearchForm: FC<Props> = ({ onSubmit, isLoading, error }) => {
  const { register, handleSubmit } = useForm<Inputs>();

  return (
    <div>
      <FormControl fullWidth variant="outlined">
        <OutlinedInput
          {...register("search", {
            onChange: debounce(
              handleSubmit(({ search }) => onSubmit({ q: search })),
              2000
            ),
          })}
          type="text"
          placeholder="Search a GitHub username..."
          startAdornment={
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          }
          endAdornment={
            isLoading && (
              <InputAdornment position="end">
                <CircularProgress size={16} />
              </InputAdornment>
            )
          }
        />
      </FormControl>
      {error && (
        <Typography color="error" sx={{ marginBlock: "1rem" }}>
          {error}
        </Typography>
      )}
    </div>
  );
};
