import moment from "moment";

export default function BlockedOnSunday({ children }) {
    const today = moment().utc(true);

    if (today.day() === 0) {
        return (
            <p>
                Hoje é domingo! Volte amanhã para começar a preencher.
            </p>
        );
    } else {
        return (
            <>
                {children}
            </>
        )
    }
}