// 有赞笔试题

/**
    DOM节点统计
    DOM 的体积过大会影响页面性能，假如你想在用户关闭页面时统计（计算并反馈给服务器）
    当前页面中元素节点的数量总和、元素节点的最大嵌套深度以及最大子元素个数，
    请用 JS 配合原生 DOM API 实现该需求（不用考虑陈旧浏览器以及在现代浏览器中的兼容性，
    可以使用任意浏览器的最新特性；不用考虑 shadow DOM）。比如在如下页面中运行后：
<html>
  <head></head>
  <body>
    <div>
      <span>t</span>
    </div>
    <div>
      <span>f</span>
      <span>o</span>
      <span>o</span>
    </div>
  </body>
</html>
会得出这样一个对象：
{
  totalElementsCount: 9,
  maxDOMTreeDepth: 4,
  maxChildrenCount: 3
}
*/
/*
{
    nodeName: ''
    children: [{
    }]
}
*/

const root = {
  nodeName: 'html',
  children: [{
      nodeName: 'head',
      children: [],
  }, {
      nodeName: 'body',
      children: [
          {
              nodeName: 'div',
              children: [{
                  nodeName: 'span',
                  children: []
              }]
          },
          {
              nodeName: 'div',

              children: [{
                  nodeName: 'span',
                  children: []
              }, {
                  nodeName: 'span',
                  children: []
              }, {
                  nodeName: 'span',
                  children: []
              }]
          }
      ]
  }]
}

const findTotals = (root) => {
  let totalElementsCount = 0;
  let maxDOMTreeDepth = 0;
  let maxChildrenCount = 0;
  if (!root) {
      return { totalElementsCount, maxDOMTreeDepth, maxChildrenCount };
  }
  if(root) totalElementsCount++;
  const checkNode = (node) => {
      const { children } = node;
      if (children.length) {
          totalElementsCount += children.length;
          maxDOMTreeDepth++;
          children.forEach(item => {
              checkNode(item);
          });
          maxChildrenCount = Math.max(children.length, maxChildrenCount);
      }
  };
  checkNode(root);
  return { totalElementsCount, maxDOMTreeDepth, maxChildrenCount }
};
console.log(findTotals(root));