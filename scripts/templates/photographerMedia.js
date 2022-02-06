function photographerMediaTemplate (newMedia) {
  const { _id, _title, _totalLikes, mediaUrl, mediaType } = newMedia;

  const cardTemplate =
  `
  <article class="photograph-media-item" data-id="${_id}">
    <div onclick="displayMediaModal(); setMediaModal(${_id}, '${mediaType}', '${mediaUrl}', '${_title}')" class="photograph-media-item_top">
      ${mediaType === 'image' ? `<img src="${mediaUrl}" title="${_title}, closeup view" alt="${_title}">` : `<video muted> <source src="${mediaUrl}#t=0.1" type="video/mp4" title="${_title}, closeup view" alt="${_title}"> Your browser does not support the video tag. </video>`}
    </div>
    <div class="photograph-media-item_bottom">
      <p>
        ${_title}
      </p>
      <div>
        <span class="photograph-media-item_bottom-likes">
        ${_totalLikes}
        </span>
        <a onclick="incrementMediaLike(${_id})">
          <svg aria-hidden="true" aria-label="likes" focusable="false" data-prefix="fas" data-icon="heart" role="img" viewBox="0 0 512 512"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
        </a>
      </div>
    </div>
  </article>
  `;

  return cardTemplate;
}
