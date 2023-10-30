namespace mis321_pa2_sebrazzley
{
    public class ConnectionString
    {
        public string cs { get; set; }

        public ConnectionString()
        {
            string server = "l6glqt8gsx37y4hs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            string database = "	mhrwhntiebpt36vp";
            string port = "	3306";
            string userName = "	q1btvr4y6h7y93x6";
            string password = "q052dot0quk6pr0e";

            char cs = $@"server = {server};user={userName};database={database};port={port};password={password};";

        }
    }
}