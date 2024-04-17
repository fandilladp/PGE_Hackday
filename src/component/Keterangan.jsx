function Keterangan() {
    return (
        <div className="wrapper">
            <h3>KETERANGAN</h3>

            <table className="table-keterangan">
                <thead>
                    <tr>
                        <th>Kode</th>
                        <th>Arah Angin</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>U</td>
                        <td>Utara</td>
                    </tr>
                    <tr>
                        <td>TL</td>
                        <td>Timur Laut</td>
                    </tr>
                    <tr>
                        <td>T</td>
                        <td>Timur</td>
                    </tr>
                    <tr>
                        <td>TG</td>
                        <td>Tenggara</td>
                    </tr>
                    <tr>
                        <td>S</td>
                        <td>Selatan</td>
                    </tr>
                    <tr>
                        <td>BD</td>
                        <td>Barat Daya</td>
                    </tr>
                    <tr>
                        <td>B</td>
                        <td>Barat</td>
                    </tr>
                    <tr>
                        <td>BL</td>
                        <td>Barat Laut</td>
                    </tr>
                </tbody>
            </table>

            <div className="container-child-keterangan">
                <span className="child-keterangan"><strong>x</strong> Arah angin menunjukan darimana angin bertiup.</span>
                <br />
                <span className="child-keterangan"><strong>x</strong> Durasi hujan harian dihitung sejak 07.00 hingga 07.00 WIB (24 jam).</span>
            </div>
        </div>
    );
}

export default Keterangan;