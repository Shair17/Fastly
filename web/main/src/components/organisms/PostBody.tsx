import markdownStyles from '../../styles/markdown-styles.module.css';

interface Props {
  content: string;
}

export const PostBody = ({content}: Props) => {
  return (
    <div
      className={markdownStyles['markdown']}
      dangerouslySetInnerHTML={{__html: content}}
    />
  );
};
