import { Fragment, type FC } from "react";
import {
  Avatar,
  Divider,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

type Props = {
  items: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  }[];
};

export const SearchResults: FC<Props> = ({ items }) => {
  if (items.length === 0) {
    return <p>No results found</p>;
  }

  return (
    <List>
      {items.map(({ id, login, avatar_url, html_url }) => (
        <Fragment key={id}>
          <ListItem  alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src={avatar_url} alt={login} />
            </ListItemAvatar>
            <ListItemText
              primary={login}
              secondary={
                <Link href={html_url} target="_blank" rel="noopener noreferrer">
                  {html_url}
                </Link>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </Fragment>
      ))}
    </List>
  );
};
