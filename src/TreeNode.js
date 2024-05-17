import React, { useState } from 'react';
import './TreeNode.css';

const TreeNode = ({ node }) => {
    // Khởi tạo state cho việc thu gọn/mở rộng nút
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };
    return (
        <div className="tree-node">
            <div onClick={toggleCollapse} className="node-content">
                {node.children.length > 0 && (
                    <button className="collapse-button">
                        {collapsed ? '+' : '-'}
                    </button>
                )}
                {node.name}
            </div>
            {!collapsed && node.children.length > 0 && (
                <div className="children">
                    {node.children.map((child, index) => (
                        <TreeNode key={index} node={child} />
                    ))}
                </div>
            )}
        </div>
    );
};
export default TreeNode;