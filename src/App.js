import React, { useState } from 'react';
import './App.css';
import TreeNode from './TreeNode';

function App() {
  // Tạo state cho input người dùng
  const [input, setInput] = useState('');
  // Tạo state cho dữ liệu cây
  const [treeData, setTreeData] = useState(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleRenderTree = () => {
    const lines = input.split('\n');
    const tree = parseInputToTree(lines);
    // Cập nhật state cho dữ liệu cây
    setTreeData(tree);
  };

  const parseInputToTree = (lines) => {
    // Tạo gốc cây
    const root = { name: 'Root', children: [] };
    // Khởi tạo stack với gốc cây và độ thụt lề là -1
    const stack = [{ node: root, indent: -1 }];

    lines.forEach((line) => {
      // Tìm vị trí của ký tự không phải khoảng trắng đầu tiên
      const indent = line.search(/\S/);
      // Loại bỏ khoảng trắng thừa
      const name = line.trim();
      // Tạo nút mới 
      const newNode = { name, children: [] };
      // Điều chỉnh stack dựa trên mức độ thụt lề
      while (stack.length > 0 && indent <= stack[stack.length - 1].indent) {
        stack.pop();
      }
      // Thêm nút mới vào cây
      stack[stack.length - 1].node.children.push(newNode);
      stack.push({ node: newNode, indent });
    });

    return root;
  };

  return (
    <div className="App">
      <div className='right'>
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Nhập cấu trúc cây tại đây..."
        />
        <button onClick={handleRenderTree}>Render Tree</button>
      </div>
      {/* Hiển thị cây nếu dữ liệu cây đã được tạo */}
      <div className="tree-container">
        {treeData && <TreeNode node={treeData} />}
      </div>
    </div>
  );
}

export default App;
