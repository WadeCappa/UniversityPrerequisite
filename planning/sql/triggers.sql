CREATE OR REPLACE TRIGGER create_executable_parent_before_insert BEFORE INSERT 
    ON task 
    FOR EACH ROW
    EXECUTE FUNCTION create_executable_parent_function();

CREATE OR REPLACE FUNCTION create_executable_parent_function