import { Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledCollapse } from "reactstrap";
import { logUserEvent } from "../../services/analytics.service";
import './header.css';
import { fetchHeaderData } from "./header.service";

function Header() {

    const { data } = fetchHeaderData();

    function logAnalytics(id: string) {
        logUserEvent({
            content_type: 'Header',
            content_id: id
        });
    }

    return (
        <Navbar className="Navbar" fixed="top"
            expand="md" container="fluid" dark light>
            <NavbarBrand onClick={() => logAnalytics('Dhaval S.')} href="#cover">
                Dhaval S.
            </NavbarBrand>
            <NavbarToggler id="headerToggler" />
            <UncontrolledCollapse
                toggler="#headerToggler"
                navbar>
                <Nav className="ms-auto"
                    navbar>
                    {data?.navItemList.map(item =>
                    (<NavItem key={item.label}>
                        <NavLink
                            className="ps-3 pe-3 nav-item--animated"
                            href={item.url}
                            target={item.label == 'RESUME' ? '_blank' : '_self'}
                            rel={item.label == 'RESUME' ? "noopener noreferrer": ''}
                            onClick={() => logAnalytics(item.label)}
                            // id={item.isGamertags ? 'resume' : undefined}
                            >
                            {item.label}
                        </NavLink>
                    </NavItem>)
                    )}
                    <NavItem>
                        <NavLink
                            onClick={() => logAnalytics('LINKS')}
                            className="ps-3 pe-3 DuskBtn--outline"
                            href="#links">
                            LINKS
                        </NavLink>
                    </NavItem>
                </Nav>
            </UncontrolledCollapse>
            {/* {!loading && data && <UncontrolledPopover
                placement="bottom"
                trigger="legacy"
                target="resume">
                <PopoverBody className="Header-Popover__body">
                    {data?.gamerTagList.map(tag =>
                        (<GamerTag key={tag.ign} ign={tag.ign} game={tag.game} />)
                    )}
                    <Button block color="info">
                        <FontAwesomeIcon icon={['fas', 'file-pdf']} />
                        &nbsp;&nbsp;
                        View Resume
                    </Button>
                    <Button outline block color="light">
                        <FontAwesomeIcon icon={['fas', 'file-download']} />
                        &nbsp;&nbsp;Download Resume
                    </Button>
                </PopoverBody>
            </UncontrolledPopover>} */}
        </Navbar>
    )
}


export default Header;