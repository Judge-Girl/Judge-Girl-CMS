import {EditorButton} from './EditorButton';


export const EditSaveCancelButton = ({isEditing, disableSave=false, loading=false, onClickEdit, onClickSave, onClickCancel}) => {
	return <>
		<div style={{display: 'flex', flexDirection: 'row'}}>
			{!isEditing?
				<EditorButton text="Edit"
					width="70px"
					height="36px"
					borderRadius="50px"
					fontColor="rgba(124,124,124,1)"
					borderColor="#D2D2D2"
					onClick={onClickEdit}/>
				:
				<>
					<EditorButton text="Save" noBorder
						buttonColor="rgba(88, 214, 141, 1)"
						fontColor="#FFF"
						width="70px"
						height="36px"
						borderRadius="50px"
						loading={loading}
						disable={disableSave}
						onClick={onClickSave}/>
					<EditorButton text="Cancel"
						fontColor="rgba(124,124,124,1)"
						width="87px"
						height="36px"
						borderRadius="50px"
						marginLeft="10px"
						onClick={onClickCancel}/>
				</>
			}
		</div>
	</>;
};
