import { Fragment } from 'react';

interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: CoursePart [];
};

const Content = (props: ContentProps) => {
  const { courseParts } = props;

  return (
    <Fragment>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
    </Fragment>
  );
};

export default Content;
