import { ContentProps } from '../utils/Types';

const Part = (props: ContentProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)} `
    );
  };

  const content = props.courseParts.map((p) => {
    switch (p.kind) {
      case 'basic':
        return (
          <div key={p.name}>
            <p>
              <b>{p.name}</b>
            </p>
            <p>
              <i>{p.description}</i>
            </p>
            <p>exercises: {p.exerciseCount}</p>
            <hr />
          </div>
        );
      case 'group':
        return (
          <div key={p.name}>
            <p>
              <b>{p.name}</b>
            </p>
            <p>exercises: {p.exerciseCount}</p>
            <p>group projects: {p.groupProjectCount}</p>
            <hr />
          </div>
        );
      case 'background':
        return (
          <div key={p.name}>
            <p>
              <b>{p.name}</b>
            </p>
            <p>
              <i>{p.description}</i>
            </p>
            <p>exercises: {p.exerciseCount}</p>
            <p>background material: {p.backgroundMaterial}</p>
            <hr />
          </div>
        );
      case 'special':
        return (
          <div key={p.name}>
            <p>
              <b>{p.name}</b>
            </p>
            <p>
              <i>{p.description}</i>
            </p>
            <p>exercises: {p.exerciseCount}</p>
            <p>
              required skills:{' '}
              {p.requirements.map((item, index) => (
                <span key={index}>
                  {item}
                  {index !== p.requirements.length - 1 && ', '}{' '}
                </span>
              ))}
            </p>
            <hr />
          </div>
        );
      default:
        return assertNever(p);
    }
  });
  return <div>{content}</div>;
};

export default Part;
