import React, { FC, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import styles from './dynamic-bar.module.scss';

type Props = {
    chlidren?: ReactNode,
    title: string,
    isVisible: boolean,
    handleToggle: () => void
}

export const DynamicBar: FC<Props> = ({ children, isVisible, title, handleToggle }) => (
    <>
        <div className={styles.barHeader}>
            <div className={styles.title} onClick={handleToggle}>
                {title}
                <FontAwesomeIcon icon={!isVisible ? faChevronDown : faChevronUp} />
            </div>
        </div>
        {
            isVisible && <div className={styles.barBody}>
                <div>{children}</div>
            </div>
        }
    </>
)