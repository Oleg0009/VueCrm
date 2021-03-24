export default {
  bind(el, {value} ){
    M.Tooltip.init(el, {html:value});
  },
  unbind(el, {value} ){
    const elementInstance = M.Tooltip.getInstance(el);
    if(elementInstance && elementInstance.destroy)
    elementInstance.destroy();
  }
}
