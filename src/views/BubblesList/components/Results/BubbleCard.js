import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Link,
  Tooltip,
  Typography,
  colors
} from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import useRouter from 'utils/useRouter';
import moment from 'moment';
import getInitials from 'utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    paddingBottom: 0
  },
  content: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0
    }
  },
  description: {
    padding: theme.spacing(2, 3, 1, 3)
  },
  tags: {
    padding: theme.spacing(0, 3, 1, 3),
    '& > * + *': {
      marginLeft: theme.spacing(1)
    }
  },
  learnMoreButton: {
    marginLeft: theme.spacing(2)
  },
  likedButton: {
    color: colors.red[600]
  },
  shareButton: {
    marginLeft: theme.spacing(1)
  },
  details: {
    padding: theme.spacing(1, 3)
  }
}));

const BubbleCard = (props) => {
  const { bubble, className, ...rest } = props;

  const router = useRouter();
  const classes = useStyles();

  const goToDetails = (bubbleId) => {
    router.history.push(`/bubbles/view/${bubbleId}`);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <Link
        color="textPrimary"
        component={RouterLink}
        to={`/bubbles/view/${bubble._id}`}
        variant="h5">
        <CardHeader
          avatar={
            <Avatar
              alt="Author"
              src={bubble.author?.avatar || '/images/avatars/avatar-mock.jpg'}>
              {getInitials(bubble.name)}
            </Avatar>
          }
          className={classes.header}
          disableTypography
          subheader={
            <Typography variant="body2">
              by{' '}
              <Link
                color="textPrimary"
                component={RouterLink}
                to=""
                variant="h6">
                {
                  bubble.users?.filter((user) => user.role === 'owner')[0]
                    .userId.name
                }
              </Link>
              <br />
              {`Atualizada: ${moment(bubble.updated_at).fromNow()}`}
            </Typography>
          }
          title={bubble.name || 'Sem nome'}
        />
      </Link>
      <CardContent className={classes.content}>
        <div className={classes.description}>
          <Typography colo="textSecondary" variant="subtitle2">
            {bubble.description}
          </Typography>
        </div>
        <div className={classes.tags}>
          {/* {bubble.tags.map(tag => (
            <Label
              color={tag.color}
              key={tag.text}
            >
              {tag.text}
            </Label>
          ))} */}
        </div>
        <Divider />
        <div className={classes.details}>
          <Grid
            alignItems="center"
            container
            justify="space-between"
            spacing={3}>
            <Grid item>
              <Tooltip title="Share">
                <IconButton className={classes.shareButton} size="small">
                  <ShareIcon />
                </IconButton>
              </Tooltip>
              <Button
                className={classes.learnMoreButton}
                size="small"
                onClick={() => goToDetails(bubble._id)}>
                Detalhes
              </Button>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
};

BubbleCard.propTypes = {
  className: PropTypes.string,
  bubble: PropTypes.object.isRequired
};

export default BubbleCard;
