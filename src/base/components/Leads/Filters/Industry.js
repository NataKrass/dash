import { useEffect, useState } from 'react';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';
import { DropdownIndustry } from 'base/styled';
import network from 'base/network';


export default function Industry() {
  const [naics, setNaics] = useState([]);
  function onChange(currentNode, selectedNodes){
    console.log('onChange::', currentNode, selectedNodes);
  }

  function onAction(node, action) {
    console.log('onAction::', action, node);
  }

  function onNodeToggle(currentNode) {
    console.log('onNodeToggle::', currentNode);
  }

  useEffect(() => {
    const getInd = async () => {
      let res = await network
        .get('/api/industries/naics', { params: {} })
        .then(({ data }) => data)
        .catch((error) => console.log(error));
  
      // setNaics(res.results.map((d) => {
      //   return {
      //     label: d.value,
      //     value: d.code,
      //     children: d.subindustries
          
      //   };
      // }));

      setNaics(res.results.map(d => {
        return {
          label: d.value,
          value: d.code,
          children: d.subindustries
          // [
        
          //   d.subindustries.map(e => {
          //     return {
          //       label: Object.keys(e),
          //       value: Object.values(e)
          //     }
          //   })
          // ]
      
        };
      }
      ));
      
    };
    getInd();
  }, []);

  // naics.map(el => {
  //   el.children.map(e => {
  //     console.log(Object.keys(e))
  //   })
  // })
  

  return (
    <DropdownIndustry>
      <DropdownTreeSelect
        data={naics}
        onChange={onChange}
        onAction={onAction}
        onNodeToggle={onNodeToggle}
        className="mdl"
      />
    </DropdownIndustry>
  );
}