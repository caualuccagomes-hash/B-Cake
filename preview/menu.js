(() => {
  const search=document.querySelector('#menu-search');
  const buttons=[...document.querySelectorAll('[data-menu-filter]')];
  const items=[...document.querySelectorAll('.menu-item')];
  const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  let category='all';
  function filter(){
    const query=normalize(search.value);
    let visible=0;
    items.forEach(item=>{
      const match=(category==='all'||item.dataset.menuCategory===category)&&normalize(item.dataset.menuSearch).includes(query);
      item.hidden=!match;
      if(match)visible++;
    });
    document.querySelector('.menu-status').textContent=`${visible} ${visible===1?'opção encontrada':'opções encontradas'}.`;
    document.querySelector('.menu-empty').hidden=visible!==0;
  }
  search.addEventListener('input',filter);
  buttons.forEach(button=>button.addEventListener('click',()=>{
    category=button.dataset.menuFilter;
    buttons.forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
    filter();
  }));
})();
