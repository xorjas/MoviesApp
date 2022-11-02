import HeaderLayout from '../../layout/header/header';
import '../principal/principalTemplate.scss';

function PrincipalTemplate({children}){
    return(
        <div>
            <HeaderLayout></HeaderLayout>
            <main>
                {children}
            </main>
        </div>
    );
}

export default PrincipalTemplate;