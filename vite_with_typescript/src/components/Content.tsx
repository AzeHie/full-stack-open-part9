import { Fragment } from 'react';
import Part from './Part';
import { ContentProps } from '../utils/Types';

const Content = (props: ContentProps) => {
  const { courseParts } = props;

  return (
    <Fragment>
      <Part courseParts={courseParts}/>
    </Fragment>
  );
};

export default Content;
