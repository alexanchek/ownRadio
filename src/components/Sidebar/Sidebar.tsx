import { useState, useRef } from 'react';
import { Hamburger } from './Hamburger';
import { useOnClickOutside } from 'src/hooks/useOnClickOutside';

import cn from 'classnames';
import styles from './Sidebar.module.scss';
import { SidebarMenu } from './SidebarMenu';
import { Version } from './Version';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const node = useRef<HTMLDivElement>(null);

  useOnClickOutside(node, () => setIsOpen(false));

  return (
    <div ref={node}>
      <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={cn(styles.sidebar, {
        [styles.open]: isOpen,
      })}>
        <div className={styles.menuContainer}>
        <SidebarMenu setIsOpen={setIsOpen} />
        <Version />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;