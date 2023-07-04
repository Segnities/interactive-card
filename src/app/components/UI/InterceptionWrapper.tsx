import styles from "@/app/styles/InterceptionWrapper.module.scss"

interface RelativeWrapperProps {
    children: React.ReactNode;
}

export default function InterceptionWrapper(props: RelativeWrapperProps) {
    return (
        <div className={styles['interception-wrapper']}>
            {props.children}
        </div>
    );
}