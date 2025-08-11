import {Link} from 'react-router-dom';
export function Navigation() {
    return (
        <nav>
            <ul>
                <li><Link to="/tasks">Task Page</Link></li>
                <li><Link to="/task-form">Task Form Page</Link></li>
            </ul>
        </nav>
    );
}