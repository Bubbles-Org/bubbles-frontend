import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, colors } from '@material-ui/core';

import { Markdown, Label } from 'components';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Brief = props => {
  const { recomendations, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        {recomendations && recomendations.map((recomendation, i) => {
          return (
            <div key={i}>
              <Label
              color={colors.blue[200]}
              >
                {recomendation}
              </Label>
            </div>
          )
        })}
        {recomendations && recomendations.length === 0 && (
          <Markdown source={'Sem recomendações'} />
        )}
      </CardContent>
    </Card>
  );
};

Brief.propTypes = {
  recomendations: PropTypes.array.isRequired,
  className: PropTypes.string
};

export default Brief;
