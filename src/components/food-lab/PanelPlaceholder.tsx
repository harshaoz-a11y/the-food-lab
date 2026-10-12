/** Holds a panel's place, at roughly its height, until its content is built. */
export function PanelPlaceholder() {
    return (
        <div className="panel-placeholder" aria-hidden="true">
            <span />
        </div>
    );
}

export default PanelPlaceholder;
