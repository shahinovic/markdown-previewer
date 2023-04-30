export const RenderDocs = ({ docs }) => {
  return docs.basic_syntax.map((item) => {
    return (
      <div className="docs" key={item.name}>
        <h2>{item.name}</h2>
        <p dangerouslySetInnerHTML={{ __html: item.description }} />

        <div class="example-container">
          <p class="example-heading">Example 1:</p>
          <p class="code-title">- markdown</p>
          <code
            dangerouslySetInnerHTML={{ __html: item.examples[0].markdown }}
          />
          <p class="code-title">- html</p>
          <code dangerouslySetInnerHTML={{ __html: item.examples[0].html }} />
        </div>
        {item.additional_examples?.map((item) => {
          return (
            <div class="example-container">
              <p class="example-heading">{item.name}</p>
              <p dangerouslySetInnerHTML={{ __html: item.description }} />
              <p class="code-title">- markdown</p>
              <code dangerouslySetInnerHTML={{ __html: item.markdown }} />
              <p class="code-title">- html</p>
              <code dangerouslySetInnerHTML={{ __html: item.html }} />
            </div>
          );
        })}
      </div>
    );
  });
};
