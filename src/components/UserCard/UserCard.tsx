import type { FC } from "react";

type Props = {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
};

export const UserCard: FC<Props> = (props) => {
  return (
    <pre>{JSON.stringify(props)}</pre>
  );
};
